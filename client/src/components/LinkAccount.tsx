import { FC } from "react";

type LinkAccountValue = "Google" | "Facebook" | "Github";

interface LinkAccountProps {
  type: LinkAccountValue;
  isLinked: boolean;
}

const LinkAccount: FC<LinkAccountProps> = ({ type, isLinked }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-white text-lg">
          Link Account with {type}
        </h1>
        <p className="text-sm text-[#888989] flex gap-2">
          Link your Spotify Clone account with your social media accounts to
          login faster and synchronize your data
        </p>
      </div>

      {type === "Google" ? (
        <button className="btn bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          {isLinked ? "Unlink Google Account" : "Link Google Account"}
        </button>
      ) : type === "Facebook" ? (
        <button className="btn bg-[#1A77F2] text-white border-[#005fd8]">
          <svg
            aria-label="Facebook logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path
              fill="white"
              d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
            ></path>
          </svg>
          {isLinked ? "Unlink Facebook Account" : "Link Facebook Account"}
        </button>
      ) : (
        <button className="btn bg-black text-white border-black">
          <svg
            aria-label="GitHub logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            ></path>
          </svg>
          {isLinked ? "Unlink GitHub Account" : "Link GitHub Account"}
        </button>
      )}
    </div>
  );
};

export default LinkAccount;
