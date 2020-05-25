import { useEffect, useRef, useState } from "react";
// https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
export default ({
  root = null,
  rootMargin,
  threshold = 0,
  onDisconnect = () => {}
}) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(
    new window.IntersectionObserver(([entry]) => updateEntry(entry), {
      root,
      rootMargin,
      threshold
    })
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();
    console.log("----");
    //console.log("Intersect", node, currentObserver);
    if (!node) {
      console.log("no node on effect run - disconnect");
      onDisconnect();
    }
    if (node) currentObserver.observe(node);

    return () => {
      console.log("cleanup after effect - disconnect", node);
      currentObserver.disconnect();
      onDisconnect();
    };
  }, [node]);

  return [setNode, entry];
};
