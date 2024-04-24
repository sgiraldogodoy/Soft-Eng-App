import AudioPlayer from "../components/services/AudioPlayer";

export default function MusicPlayerEasterEgg() {
  const playlist: string[] = [];

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center py-10">
      <AudioPlayer playlist={playlist} />
    </div>
  );
}
