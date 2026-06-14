import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  component: ToolsLayout,
});

function ToolsLayout() {
  const matches = useMatches();
  const isIndex = matches[matches.length - 1]?.routeId === "/tools/";
  return (
    <div className={isIndex ? "" : "px-4 pt-10 pb-10"}>
      <Outlet />
    </div>
  );
}
