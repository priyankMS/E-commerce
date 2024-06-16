const Videoplayer = () => {
  return (
    <div className="flex justify-center items-center  mt-5 w-full p-20">
      <video 
      className=" w-full  rounded-lg shadow-md"
        src="../../public/Blue Professional How To Order Online Video (1).mp4"
         loop
        autoPlay
        
      ></video>
    </div>
  );
};
export default Videoplayer;
