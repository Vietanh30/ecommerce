import React from "react";

const ChatBox = ({ onClose }) => {
  return (
    
        <div
          className="zalo-chat-widget"
          data-oaid="24667240278009508"
          data-welcome-message="Rất vui khi được hỗ trợ bạn!"
          data-autopopup="0"
          style={{
            border: 'none',
            visibility: 'visible',
            position: 'fixed',
            zIndex: '2147483644 !important',
            bottom: '32px',
            right: '32px'
          }}
        >
          <iframe
            id="chatiframe"
            frameBorder="0"
            allowFullScreen
            scrolling="no"
            src="https://page.widget.zalo.me/?position=null&oaid=24667240278009508&welcomemessage=R%E1%BB%8B%20vui%20khi%20đ%E1%BB%8Bnh%20h%E1%BB%8D%20b%E1%BA%A1n!&autopopup=0&leftside=false&width=440&height=813&style=2&id=01e9420a-5e61-4364-8bda-e0f8caffc26e&domain=shopkimkhi.ntha.com&android=false&ios=false"
            style={{
              width: '400px',
              maxWidth: '90vw',
              height: '75vh',
              maxHeight: '90vh',
              position: 'absolute',
              bottom: '0',
              right: '0',
            }}
          />
        </div>
  );
};

export default ChatBox;