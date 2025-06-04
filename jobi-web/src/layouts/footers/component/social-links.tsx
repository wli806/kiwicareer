import React from 'react';

const SocialShareLinks: React.FC = () => {

  const url: string = process.env.FRONT_END_URL!;

  const title = "KiwiCareer - Your Gateway to Premier New Zealand Job Opportunities";
  const text = "Discover your dream job and connect with top employers in New Zealand on KiwiCareer, the leading job portal and job board for career advancement."

  // 对 URL、标题和描述进行 URL 编码
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title}\n${text}`);

  // 构造各个平台的分享链接
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodedText}%0A${encodedUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <>
      <li>
        <a href={whatsappShare} target="_blank" rel="noopener noreferrer">
          <i className="bi bi-whatsapp"></i>
        </a>
      </li>
      <li>
        <a href={twitterShare} target="_blank" rel="noopener noreferrer">
          <i className="bi bi-twitter"></i>
        </a>
      </li>
      <li>
        <a href={facebookShare} target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
      </li>
      <li>
        <a href={linkedinShare} target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin"></i>
        </a>
      </li>
    </>
  );
};

export default SocialShareLinks;
