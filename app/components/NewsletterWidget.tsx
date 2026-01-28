export default function NewsletterWidget() {
  return (
    <div className="w-full py-12" style={{ backgroundColor: "#0353a4" }}>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Subscribe to my newsletter
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to my newsletter for the latest blog posts, tips, & travel
            guides. Let's stay updated!
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: "#0353a4" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
