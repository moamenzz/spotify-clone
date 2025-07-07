import { MdExplicit } from "react-icons/md";
import CustomizeFeed from "../components/CustomizeFeed";
import LinkAccount from "../components/LinkAccount";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-[#131312] py-4">
      <div className="mx-auto max-w-[40rem]">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3">
            <h1 className="text-white font-bold text-2xl">Settings</h1>
            {/* Search Bar */}
            <div>{/* TODO: Add search bar */}</div>
          </div>

          {/* App Settings */}

          <div className="space-y-5 py-3">
            {/* Header */}
            <h1 className="text-2xl text-white font-bold">App Settings</h1>

            {/* Explicit Content */}
            <div className="flex items-center justify-between">
              {/* Text */}
              <div className="flex flex-col space-y-1">
                <h1 className="text-lg text-white font-bold">
                  Explicit Content
                </h1>
                <p className="text-sm text-[#888989] flex gap-2">
                  Allow Explicit Content Labeled with the{" "}
                  <MdExplicit size={20} />
                  tag
                </p>
              </div>
              {/* Toggle */}
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-success"
              />
            </div>
          </div>

          {/* Auth Settings */}

          <div className="space-y-5 py-3">
            {/* Header */}
            <h1 className="text-2xl text-white font-bold">
              Authentication Settings
            </h1>

            {/* OAuth Connections */}

            {/* Connect Google */}
            <LinkAccount type="Google" isLinked={false} />

            {/* Connect Facebook */}
            <LinkAccount type="Facebook" isLinked={false} />

            {/* Connect Github */}
            <LinkAccount type="Github" isLinked={false} />
          </div>

          {/* Customize your Feed page */}

          {/* TODO: Create Feed Customization Component in order to avoid repition */}

          <div className="space-y-5 py-3">
            <h1 className="text-2xl text-white font-bold">
              Customize Your Feed Page
            </h1>

            {/* Made For You */}
            <CustomizeFeed type="Made For You" />

            {/* Trending Albums/Singles */}
            <CustomizeFeed type="Trending Albums/Singles" />

            {/* Recently Played */}
            <CustomizeFeed type="Recently Played" />

            {/* Discover Picks For You */}
            <CustomizeFeed type="Discover Picks For You" />

            {/* Your Top Mixes */}
            <CustomizeFeed type="Your Top Mixes" />

            {/* Jump Back In */}
            <CustomizeFeed type="Jump Back In" />

            {/* Episodes For You */}
            {/* <CustomizeFeed type="Episodes For You" /> */}

            {/* Best Of Artists */}
            <CustomizeFeed type="Best Of Artists" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
