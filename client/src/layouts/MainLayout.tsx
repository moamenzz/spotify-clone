import Navbar from "../components/Navbar";
import ViewPlayer from "../components/ViewPlayer";
import AudioPlayer from "../components/AudioPlayer";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Outlet } from "react-router-dom";
import useUIStore from "../stores/useUIStore";
import { MinimizedSidebar, Sidebar } from "../components/Sidebar";
import Queue from "../components/Queue";

const MainLayout = () => {
  const { showSidebar, showViewPlayer, showQueue } = useUIStore();

  return (
    <div className="bg-black flex flex-col h-screen">
      {/* Navigation Bar */}
      <div className="h-16 w-full">
        <Navbar />
      </div>

      <div className="flex-1 w-full">
        <PanelGroup autoSaveId="conditional" direction="horizontal">
          {/* React Resizable components */}

          {/* Sidebar */}
          {showSidebar ? (
            <>
              <Panel
                id="left"
                maxSize={30}
                defaultSize={20}
                minSize={17}
                order={1}
              >
                <div className="h-[calc(100vh-9rem)] overflow-hidden">
                  <Sidebar />
                </div>
              </Panel>
              <PanelResizeHandle className="w-2 rounded-full bg-black " />
            </>
          ) : (
            <>
              <Panel
                id="minimizedLeft"
                defaultSize={4}
                maxSize={4}
                minSize={4}
                order={1}
              >
                <MinimizedSidebar />
              </Panel>
              <PanelResizeHandle className="w-2 rounded-full bg-black " />
            </>
          )}

          {/* Main Content, App.tsx routes */}

          <Panel id="middle" order={2} defaultSize={60}>
            <div className="h-[calc(100vh-10rem)] overflow-y-auto">
              <Outlet />
            </div>
          </Panel>

          {/* View player */}
          {showViewPlayer ? (
            <>
              <PanelResizeHandle className="w-2 rounded-full bg-black" />
              <Panel
                id="right"
                maxSize={30}
                defaultSize={20}
                minSize={17}
                order={3}
              >
                <div className="h-[calc(100vh-9rem)] overflow-hidden">
                  <ViewPlayer />
                </div>
              </Panel>
            </>
          ) : showQueue ? (
            <>
              <PanelResizeHandle className="w-2 rounded-full bg-black" />
              <Panel
                id="right"
                maxSize={30}
                defaultSize={20}
                minSize={17}
                order={3}
              >
                <div className="h-[calc(100vh-9rem)] overflow-hidden">
                  <Queue />
                </div>
              </Panel>
            </>
          ) : (
            <div></div>
          )}
        </PanelGroup>
      </div>

      {/* Audio playback component */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-black z-50">
        <AudioPlayer />
      </div>
    </div>
  );
};

export default MainLayout;
