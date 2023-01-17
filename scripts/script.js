const elVideo = document.getElementById('video')

navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)

const cargarCamera = () => {
    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        stream => elVideo.srcObject = stream,
        console.error
        )
}

// Cargar los modelos
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(cargarCamera)

elVideo.addEventListener('play', async () => {
    // Creamos el canvas con los elementos de la face api
    const canvas = faceapi.createCanvasFromMedia(elVideo)
    // Lo añadimos al body de nuestro html
    document.body.append(canvas)

    // Tamaño del canvas 
    const displaySize = {width: elVideo.width, height: elVideo.height }
    faceapi.matchDimensions(canvas, displaySize)

    // Detectar la cara
    setInterval(async () => {
        // Hacemos las detecciones de cara
        const detections = await faceapi.detectAllFaces(elVideo)
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors()

        // Ponerlas en el canvas    
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        // Limpiar el canvas
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

        // Dibujar las lineas
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        resizedDetections.forEach(detection => {
            const box = detection.detection.box

            var estado = document.getElementById("estado");
            if(detection.expressions.happy > detection.expressions.sad && detection.expressions.happy > detection.expressions.neutral && detection.expressions.happy > detection.expressions.angry && detection.expressions.happy > detection.expressions.disgusted && detection.expressions.happy > detection.expressions.fearful && detection.expressions.happy > detection.expressions.surprised){
                estado.innerHTML = 'Feliz';
            }
            if(detection.expressions.sad > detection.expressions.happy && detection.expressions.sad > detection.expressions.neutral && detection.expressions.sad > detection.expressions.angry && detection.expressions.sad > detection.expressions.disgusted && detection.expressions.sad > detection.expressions.fearful && detection.expressions.sad > detection.expressions.surprised){
                estado.innerHTML = 'Triste';
            }
            if(detection.expressions.neutral > detection.expressions.sad && detection.expressions.neutral > detection.expressions.happy && detection.expressions.neutral > detection.expressions.angry && detection.expressions.neutral > detection.expressions.disgusted && detection.expressions.neutral > detection.expressions.fearful && detection.expressions.neutral > detection.expressions.surprised){
                estado.innerHTML = 'Neutral';
            }
            if(detection.expressions.angry > detection.expressions.sad && detection.expressions.angry > detection.expressions.neutral && detection.expressions.angry > detection.expressions.happy && detection.expressions.angry > detection.expressions.disgusted && detection.expressions.angry > detection.expressions.fearful && detection.expressions.angry > detection.expressions.surprised){
                estado.innerHTML = 'Enojado';
            }
            if(detection.expressions.disgusted > detection.expressions.sad && detection.expressions.disgusted > detection.expressions.neutral && detection.expressions.disgusted > detection.expressions.angry && detection.expressions.disgusted > detection.expressions.happy && detection.expressions.disgusted > detection.expressions.fearful && detection.expressions.disgusted > detection.expressions.surprised){
                estado.innerHTML = 'Disgustado';
            }
            if(detection.expressions.fearful > detection.expressions.sad && detection.expressions.fearful > detection.expressions.neutral && detection.expressions.fearful > detection.expressions.angry && detection.expressions.fearful > detection.expressions.disgusted && detection.expressions.fearful > detection.expressions.happy && detection.expressions.fearful > detection.expressions.surprised){
                estado.innerHTML = 'Asustado';
            }
            if(detection.expressions.surprised > detection.expressions.sad && detection.expressions.surprised > detection.expressions.neutral && detection.expressions.surprised > detection.expressions.angry && detection.expressions.surprised > detection.expressions.disgusted && detection.expressions.surprised > detection.expressions.fearful && detection.expressions.surprised > detection.expressions.happy){
                estado.innerHTML = 'Asombrado';
            }

            new faceapi.draw.DrawBox(box, {
                label: Math.round(detection.age) + ' años ' + detection.gender
            }).draw(canvas)
        })

    })
})