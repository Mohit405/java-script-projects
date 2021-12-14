const videoElement = document.getElementById("Video");
const button = document.getElementById("button");

//prompt to select media stream
async function mediaStream() {
  try {
    const response = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = response;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    //catch error
    console.log("there is some error in this function");
  }
}
button.addEventListener("click", async () => {
  button.disabled = true;
  //Start picture in picture using start button..
  await videoElement.requestPictureInPicture();

  button.disabled = false;
});
mediaStream();
