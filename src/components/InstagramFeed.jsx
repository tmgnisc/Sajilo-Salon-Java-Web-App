export default function InstagramFeed() {
  const images = [
    "https://i.pinimg.com/736x/42/a9/5c/42a95ca51aca795096469cd50743ae5e.jpg",
    "https://i.pinimg.com/736x/cd/01/d8/cd01d8beee27e0972f2a6f102c941408.jpg",
    "https://i.pinimg.com/736x/05/85/1e/05851e89f9824e75a4e27d7c10f2b2bc.jpg",
    "https://i.pinimg.com/736x/18/53/50/18535002e3e3477ff23f4318b674b6f9.jpg",
    "https://i.pinimg.com/736x/1a/65/71/1a65718d19d2b96f681281a56e9fa1d9.jpg",
    "https://i.pinimg.com/736x/f1/90/24/f19024523635be1ca1c18b02b986f4b0.jpg",
    "https://i.pinimg.com/736x/8c/4f/b9/8c4fb9b6588191429edd1fe9076edb5b.jpg",
    "https://i.pinimg.com/736x/30/e2/18/30e218881e252ec96c2d85190529bca0.jpg",
    "https://i.pinimg.com/736x/04/33/f0/0433f09543bdcb69eec6fe35eb15e3f8.jpg",
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-semibold text-white text-center mb-12">
          Instagram Feed
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img
                src={`${src}?w=300&h=300&fit=crop`}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
