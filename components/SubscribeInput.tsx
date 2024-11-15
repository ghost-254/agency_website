// components/SubscribeInput.tsx

export default function SubscribeInput() {
    return (
      <div className="flex items-left bg-white rounded-full border border-gray-300 overflow-hidden max-w-md mx-auto shadow-md">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow p-3 rounded-l-full outline-none text-gray-700"
        />
        <button className="bg-black text-white px-6 py-3 rounded-full font-semibold">
          Subscribe
        </button>
      </div>
    );
  }
  