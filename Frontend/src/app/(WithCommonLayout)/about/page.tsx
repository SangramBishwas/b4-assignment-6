const AboutPage = () => {
  return (
    <div className="bg-gray-50 px-4 py-10 md:px-12 lg:px-32 my-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          About Us
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-black">AsMart</span> —
          your trusted platform for discovering and posting ads for high-quality
          resell products. Whether you’re looking to declutter your space or
          find great deals on second-hand items, we make the process smooth,
          simple, and secure.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Our mission is to connect people who want to sell pre-owned products
          with those who are hunting for good bargains. From electronics and
          fashion to furniture and collectibles — everything has a second life
          here.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Our mission is to connect people who want to sell pre-owned products
          with those who are hunting for good bargains. From electronics and
          fashion to furniture and collectibles — everything has a second life
          here.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Built with simplicity and trust in mind, ReSellX empowers communities
          to trade responsibly, reduce waste, and save money — one item at a
          time.
        </p>
        <div className="pt-6 border-t text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AsMart. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
