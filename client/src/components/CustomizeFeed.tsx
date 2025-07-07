import { FC, useEffect, useState } from "react";

type FeedPropsValue =
  | "Made For You"
  | "Trending Albums/Singles"
  | "Recently Played"
  | "Discover Picks For You"
  | "Your Top Mixes"
  | "Jump Back In"
  | "Episodes For You"
  | "Best Of Artists";

interface CustomizeFeedsProps {
  type: FeedPropsValue;
}

const CustomizeFeed: FC<CustomizeFeedsProps> = ({ type }) => {
  const [title, setTitle] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    setTitle(type);
    setInfo(`Show ${type} content on your feed page`);
  }, [type]);

  return (
    <div className="flex items-center justify-between">
      {/* Text */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-lg text-white font-bold">{title}</h1>
        <p className="text-sm text-[#888989] flex gap-2">{info}</p>
      </div>
      {/* Toggle */}
      <input type="checkbox" defaultChecked className="toggle toggle-success" />
    </div>
  );
};

export default CustomizeFeed;
