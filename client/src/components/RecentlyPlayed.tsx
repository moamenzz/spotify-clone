import { FC, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import useUIStore from "../stores/useUIStore";
import { extractColorFromImage } from "../utils/colorUtils";
import { Link } from "react-router-dom";

export interface RecentAlbumsProps {
  id: number;
  cover: string;
  title: string;
  slug: string;
  type: "Playlist" | "Artist" | "Single";
}

const RecentlyPlayed = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const recents: RecentAlbumsProps[] = [
    {
      id: 1,
      cover: "/liked-songs.jpg",
      title: "Liked Songs",
      slug: "liked-songs",
      type: "Playlist",
    },
    {
      id: 2,
      cover: "/on-repeat.jpg",
      title: "On Repeat",
      slug: "on-repeat",
      type: "Playlist",
    },
    {
      id: 3,
      cover: "/zandros.jpg",
      title: "zandros",
      slug: "zandros",
      type: "Artist",
    },
    {
      id: 4,
      cover: "/limi.jpg",
      title: "Limi",
      slug: "limi",
      type: "Artist",
    },
    {
      id: 5,
      cover: "/mellina.jpg",
      title: "Mellina Tay",
      slug: "mellina-tay",
      type: "Artist",
    },
    {
      id: 6,
      cover: "/shehab-cover-img.png",
      title: "Shehab",
      slug: "shehab",
      type: "Artist",
    },
    {
      id: 7,
      cover: "/obsessed.jpg",
      title: "Obsessed",
      slug: "obsessed",
      type: "Single",
    },
    {
      id: 8,
      cover: "/2AM.jpg",
      title: "2 AM",
      slug: "2-am",
      type: "Single",
    },
  ];
  const categories = ["All", "Music", "Podcasts"];
  return (
    <div className="w-full h-full">
      {/* Categories */}
      <div className="flex items-center space-x-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
              selectedCategory === category
                ? "bg-white text-black"
                : "bg-[#232323] text-white hover:bg-[#2a2a2a]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recently Played */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 pt-6">
        {recents.map((recent) => (
          <RecentItem item={recent} key={recent.id} />
        ))}
      </div>
    </div>
  );
};

interface RecentItemProp {
  item: {
    id: number;
    cover: string;
    title: string;
    slug: string;
    type: "Playlist" | "Artist" | "Single";
  };
}

const RecentItem: FC<RecentItemProp> = ({ item }) => {
  const { setHoverColor } = useUIStore();
  const [itemColor, setItemColor] = useState("");

  // Extrahiere die Farbe beim ersten Rendern
  useEffect(() => {
    let isMounted = true;

    const getImageColor = async () => {
      try {
        const color = await extractColorFromImage(item.cover);
        // console.log("Color :", color);
        if (isMounted) {
          setItemColor(color);
          // console.log("Component is successfully mounted");
        }
      } catch (error) {
        console.error("Fehler beim Laden der Farbe:", error);
      }
    };

    getImageColor();

    return () => {
      isMounted = false;
    };
  }, [item.cover]);

  // useEffect(() => {
  //   console.log("Item-Color updated:", itemColor);
  // }, [itemColor]);

  return (
    <Link
      to={
        item.type === "Artist"
          ? `/artist/${item.slug}`
          : item.type === "Playlist"
          ? `/playlist/${item.slug}`
          : `/album/${item.slug}`
      }
    >
      <div
        className="bg-[#181818] hover:bg-[#32343a] cursor-pointer transition-colors duration-300 rounded-lg gap-3 flex w-[14rem] relative group"
        onMouseEnter={() => setHoverColor(itemColor)}
        onMouseLeave={() => setHoverColor("#292929")}
      >
        {/* Cover */}
        <div>
          <img
            src={item.cover}
            alt="recent-cover"
            className="object-cover w-16 h-16"
          />
        </div>
        {/* Title */}
        <div className="text-sm font-semibold flex items-center text-white">
          {item.title}
        </div>
        {/* Play button */}
        <button className="top-4.5 left-46 text-black absolute p-2 flex items-center opacity-0 bg-green-500 rounded-full shadow-lg cursor-pointer translate-y-2 group-hover:opacity-100 group-hover:bg-green-400 group-hover:translate-y-0 transition-all duration-300">
          <FaPlay size={14} />
        </button>
      </div>
    </Link>
  );
};

export default RecentlyPlayed;
