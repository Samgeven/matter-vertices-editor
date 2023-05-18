import { Vector, Vertices } from "matter-js"
import simplify from "simplify-js"

function removeClosePoints(points: Vector[], minDistance: number) {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = Math.sqrt((points[i].x - points[j].x) ** 2 + (points[i].y - points[j].y) ** 2);
      if (distance < minDistance) {
        points.splice(j, 1);
        j--;
      }
    }
  }
  return points;
}

export const createPolygonFromImage = (image: HTMLImageElement): Vector[] => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  console.log(canvas)
  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  const width = imageData.width
  const height = imageData.height
  const points: Vector[] = [];

  const offsetX = window.innerWidth / 2 - width / 2
  const offsetY = window.innerHeight / 2 - height / 2
  
  // Loop through each pixel and create line segments between opaque pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const alpha = pixels[index + 3];
      
      if (alpha > 0) {    
        // Check neighboring pixels and add line segments between them
        const neighbors = [
          { x: x - 1, y },
          { x: x + 1, y },
          { x, y: y - 1 },
          { x, y: y + 1 },
        ];
        
        neighbors.forEach((neighbor) => {
          const neighborIndex = (neighbor.y * width + neighbor.x) * 4;
          const neighborAlpha = pixels[neighborIndex + 3];
          
          if (neighborAlpha === 0) {
            // Add a line segment between these two points
            points.push({ x, y });
          }

          if (neighbor.x === width -1 || neighbor.y === height - 1) {
            points.push({ x, y });
          }
        });
      }
    }
  }

  return points.map(el => {
    return {
      x: el.x += offsetX,
      y: el.y += offsetY,
    }
  })
}

export const removeCloseAndCollinear = (vertices: Vector[], tolerance = 5, minDistance = 10) => {
  const simplified = simplify(Vertices.clockwiseSort(vertices), tolerance, true)
  return removeClosePoints(simplified, minDistance)
}
