export default function FloatingDiscordLink() {
  return (
    <a
      href="https://discord.gg/4U2Z95gjrf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group rounded-full"
      title="Join Discord Server"
    >
      <img 
        src="/DiscordLogo.png.png" 
        alt="Discord" 
        className="w-20 h-20 transition-transform group-hover:rotate-12 drop-shadow-lg rounded-full"
      />
    </a>
  );
}
