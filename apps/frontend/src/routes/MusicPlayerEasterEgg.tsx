import AudioPlayer from "../components/services/AudioPlayer";
import Iteration1 from "/Iteration1.mp3";
import Iteration2 from "/Iteration2.mp3";
import Iteration3 from "/Iteration3.mp3";
import Interation4 from "/Iteration4.mp3";
import Iteration5 from "/Iteration5.mp3";

export default function MusicPlayerEasterEgg() {
  const playlist = [
    { url: Iteration1, name: "Iteration 1" },
    { url: Iteration2, name: "Iteration 2" },
    { url: Iteration3, name: "Iteration 3" },
    { url: Interation4, name: "Iteration 4" },
    { url: Iteration5, name: "Iteration 5" },
  ];

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center py-10">
      <AudioPlayer playlist={playlist} />
    </div>
  );
}
