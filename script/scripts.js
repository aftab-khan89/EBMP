// WORKING

const video = document.getElementById("video");


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models")
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => (video.srcObject = stream),
    err => console.error(err)
  );
}

video.addEventListener("playing", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    // faceapi.draw.drawDetections(canvas, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    try{
    // console.log(resizedDetections[0].expressions);
    if(resizedDetections[0].expressions.neutral>=0.51){
      console.log("neutral "+resizedDetections[0].expressions.neutral);
    }
    if(resizedDetections[0].expressions.happy>=0.51){
      console.log("happy "+resizedDetections[0].expressions.happy);
    }
    if(resizedDetections[0].expressions.sad>=0.51){
      console.log("sad "+resizedDetections[0].expressions.sad);
    }
    if(resizedDetections[0].expressions.fearful>=0.51){
      console.log("fearful "+resizedDetections[0].expressions.fearful);
    }
    if(resizedDetections[0].expressions.surprised>=0.51){
      console.log("surprised "+resizedDetections[0].expressions.surprised);
    }
    if(resizedDetections[0].expressions.angry>=0.51){
      console.log("angry "+resizedDetections[0].expressions.angry);
    }
    // console.log("neutral "+resizedDetections[0].expressions.neutral);
  }
    catch(err){
  if (err instanceof TypeError) {
  console.log("Can't Capture your face!!!");
}}
  },100);
});


