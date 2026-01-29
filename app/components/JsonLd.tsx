interface JsonLdProps {
  /** JSON-LD graph object with @context and @graph, or single object */
  data: { "@context": string; "@graph"?: unknown[] } | object;
}

export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
