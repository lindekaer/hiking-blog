import type {
  Article as SchemaArticle,
  BreadcrumbList,
  CollectionPage,
  ItemList,
  Organization,
  Person,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import { site, pages, SITE_URL } from "@/config/site";
import type { Article } from "./articleService";

type Graph =
  | WithContext<SchemaArticle>
  | WithContext<WebPage>
  | WithContext<WebSite>
  | WithContext<Organization>
  | WithContext<BreadcrumbList>
  | WithContext<CollectionPage>
  | WithContext<ItemList>
  | WithContext<Person>;

interface BreadcrumbInput {
  name: string;
  url: string;
  position: number;
}

interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Graph[];
}

class JsonLdService {
  private getAbsoluteUrl(path: string): string {
    return path.startsWith("http") ? path : `${SITE_URL}${path}`;
  }

  generateOrganizationFragment(): WithContext<Organization> {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: site.logo,
      description: site.description,
    };
  }

  generateWebSiteFragment(
    publisher: WithContext<Organization>
  ): WithContext<WebSite> {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      description: site.description,
      publisher,
    };
  }

  generateWebPageFragment({
    pageUri,
    pageDescription,
    webSite,
    pageName,
  }: {
    pageUri: string;
    pageDescription: string;
    webSite: WithContext<WebSite>;
    pageName?: string;
  }): WithContext<WebPage> {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageName ?? site.name,
      url: this.getAbsoluteUrl(pageUri),
      description: pageDescription,
      isPartOf: webSite,
    };
  }

  generateBreadcrumbFragment(
    breadcrumbs: BreadcrumbInput[]
  ): WithContext<BreadcrumbList> {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((breadcrumb) => ({
        "@type": "ListItem" as const,
        position: breadcrumb.position,
        name: breadcrumb.name,
        item: this.getAbsoluteUrl(breadcrumb.url),
      })),
    };
  }

  generateArticleFragment({
    title,
    author,
    date,
    image,
    content,
    excerpt,
    authorImage,
    publisher,
    keywords,
  }: {
    title: string;
    author: string;
    date: string;
    image?: string;
    content: string;
    excerpt: string;
    authorImage?: string;
    publisher: WithContext<Organization>;
    keywords?: string;
  }): WithContext<SchemaArticle> {
    const authorSchema: WithContext<Person> = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author,
      ...(authorImage && { image: this.getAbsoluteUrl(authorImage) }),
    };

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      author: authorSchema,
      datePublished: date,
      description: excerpt,
      articleBody: content,
      publisher,
      ...(image && { image: this.getAbsoluteUrl(image) }),
      ...(keywords && { keywords }),
    };
  }

  generateItemListFragment(numberOfItems: number): WithContext<ItemList> {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: site.name,
      description: site.description,
      numberOfItems,
      url: site.url,
    };
  }

  generateCollectionPageFragment({
    pageUri,
    pageDescription,
    itemList,
    webSite,
  }: {
    pageUri: string;
    pageDescription: string;
    itemList: WithContext<ItemList>;
    webSite: WithContext<WebSite>;
  }): WithContext<CollectionPage> {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: site.name,
      url: this.getAbsoluteUrl(pageUri),
      description: pageDescription,
      mainEntity: itemList,
      isPartOf: webSite,
    };
  }

  /* Page JSON-LD generation */

  getHomePageJsonLd(): JsonLdGraph {
    const organization = this.generateOrganizationFragment();
    const webSite = this.generateWebSiteFragment(organization);
    return {
      "@context": "https://schema.org",
      "@graph": [webSite, organization],
    };
  }

  getAboutPageJsonLd(): JsonLdGraph {
    const organization = this.generateOrganizationFragment();
    const webSite = this.generateWebSiteFragment(organization);
    const webPage = this.generateWebPageFragment({
      pageUri: pages.About.path,
      pageDescription:
        "About Ultralight Life – hiking adventures and outdoor exploration.",
      webSite,
      pageName: pages.About.name,
    });
    const breadcrumbs = this.generateBreadcrumbFragment([
      { name: pages.Home.name, url: pages.Home.path, position: 1 },
      { name: pages.About.name, url: pages.About.path, position: 2 },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [webPage, organization, breadcrumbs],
    };
  }

  getArticlesPageJsonLd(numberOfArticles: number): JsonLdGraph {
    const organization = this.generateOrganizationFragment();
    const webSite = this.generateWebSiteFragment(organization);
    const webPage = this.generateWebPageFragment({
      pageUri: pages.Articles.path,
      pageDescription: "Browse all articles and hiking adventures.",
      webSite,
      pageName: pages.Articles.name,
    });
    const itemList = this.generateItemListFragment(numberOfArticles);
    const collectionPage = this.generateCollectionPageFragment({
      pageUri: pages.Articles.path,
      pageDescription: "Browse all articles and hiking adventures.",
      itemList,
      webSite,
    });
    const breadcrumbs = this.generateBreadcrumbFragment([
      { name: pages.Home.name, url: pages.Home.path, position: 1 },
      { name: pages.Articles.name, url: pages.Articles.path, position: 2 },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [webPage, organization, collectionPage, itemList, breadcrumbs],
    };
  }

  getArticlePageJsonLd(article: Article): JsonLdGraph {
    const organization = this.generateOrganizationFragment();
    const webSite = this.generateWebSiteFragment(organization);
    const pageUri = `/articles/${article.slug}`;
    const webPage = this.generateWebPageFragment({
      pageUri,
      pageDescription: article.excerpt,
      webSite,
      pageName: article.title,
    });
    const articleSchema = this.generateArticleFragment({
      title: article.title,
      author: article.author?.name ?? site.name,
      date: article.date,
      image: article.thumbnail,
      content: article.content,
      excerpt: article.excerpt,
      authorImage: article.author?.avatar,
      publisher: organization,
      keywords: article.tags?.join(", "),
    });
    const breadcrumbs = this.generateBreadcrumbFragment([
      { name: pages.Home.name, url: pages.Home.path, position: 1 },
      { name: pages.Articles.name, url: pages.Articles.path, position: 2 },
      { name: article.title, url: pageUri, position: 3 },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [webPage, organization, articleSchema, breadcrumbs],
    };
  }

  getGalleryPageJsonLd(): JsonLdGraph {
    const organization = this.generateOrganizationFragment();
    const webSite = this.generateWebSiteFragment(organization);
    const webPage = this.generateWebPageFragment({
      pageUri: pages.Gallery.path,
      pageDescription:
        "Photo gallery from hiking adventures and outdoor exploration.",
      webSite,
      pageName: pages.Gallery.name,
    });
    const breadcrumbs = this.generateBreadcrumbFragment([
      { name: pages.Home.name, url: pages.Home.path, position: 1 },
      { name: pages.Gallery.name, url: pages.Gallery.path, position: 2 },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [webPage, organization, breadcrumbs],
    };
  }
}

export const jsonLdService = new JsonLdService();
