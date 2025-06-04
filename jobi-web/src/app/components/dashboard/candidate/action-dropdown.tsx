import React from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { useRouter } from "next/navigation";

type IProps = {
  jobId: number;
  onDelete?: (jobId: number) => void;
};

const ActionDropdown = ({ jobId, onDelete }: IProps) => {
  const router = useRouter();

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button className="dropdown-item" onClick={() => router.push(`/job-details-v1/${jobId}`)}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </button>
      </li>
      {/* <li>
        <a className="dropdown-item" href="#">
          <Image src={share} alt="icon" className="lazy-img" /> Share
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </a>
      </li> */}
      {onDelete && <li>
        <button className="dropdown-item text-danger" onClick={() => onDelete(jobId)}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </button>
      </li>}
    </ul>
  );
};

export default ActionDropdown;
