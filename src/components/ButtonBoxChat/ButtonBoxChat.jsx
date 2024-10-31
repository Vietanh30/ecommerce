import React from "react";

const ButtonBoxChat = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 w-14 h-14 bg-blue-500 text-white text-2xl rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-200 z-50"
    >
      💬
    </button>
  );
};

export default ButtonBoxChat;
