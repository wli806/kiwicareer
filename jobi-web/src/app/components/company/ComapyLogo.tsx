// components/CompanyLogo.tsx
import Image from "next/image";

interface CompanyLogoProps {
  /**
   * 公司 logo 的 URL，如果为空则显示默认 logo
   */
  companyLogo?: string;
  /**
   * 可选：图片的宽度，默认为 100
   */
  width?: number;
  /**
   * 可选：图片的高度，默认为 100
   */
  height?: number;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({
  companyLogo,
  width = 100,
  height = 100,
}) => {
  // 如果有公司logo，则使用它，否则使用默认 logo
  const src = companyLogo || "/assets/logo/default.png";
  // alt 文案也可以根据情况设置
  const alt = companyLogo ? "logo" : "default logo";

  return (
    <Image
      className="lazy-img m-auto logo"
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      style={{ objectFit: "contain" }}
    />
  );
};

export default CompanyLogo;
