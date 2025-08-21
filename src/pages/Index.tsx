import Home from "./Home";

interface IndexProps {
  onLogin?: (type: "artist" | "wall_owner") => void;
}

const Index = ({ onLogin }: IndexProps) => {
  return <Home onLogin={onLogin} />;
};

export default Index;
