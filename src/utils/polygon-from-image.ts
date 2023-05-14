import { Vector, Vertices } from "matter-js"
import simplify from "simplify-js"
import * as polyk  from 'polyk';

function filterVertices(vertices: Vector[], threshold: number) {
  const result = [];
  
  // Check if the first and last vertices are the same
  const dist = Math.sqrt((vertices[0].x - vertices[vertices.length - 1].x) ** 2 + (vertices[0].y - vertices[vertices.length - 1].y) ** 2);
  if (dist < threshold) {
    vertices.pop();
  }
  
  // Iterate through the vertices and filter out non-critical points
  for (let i = 0; i < vertices.length - 1; i++) {
    const dist = Math.sqrt((vertices[i].x - vertices[i + 1].x) ** 2 + (vertices[i].y - vertices[i + 1].y) ** 2);
    if (dist > threshold) {
      result.push(vertices[i + 1]);
    }
  }
  
  // Add the last vertex to the result array
  result.push(vertices[vertices.length - 1]);
  
  return result;
}

export const createPolygonFromImage = (image: HTMLImageElement) => {
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
      
      if (alpha === 255) {
        // Add this pixel as a point
        // points.push({ x, y });
        
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
          
          if (neighborAlpha === 255) {
            // Add a line segment between these two points
            points.push({ x: neighbor.x, y: neighbor.y });
          }
        });
      }
    }
  }
  
  // Simplify the set of line segments into a polygon
  const tolerance = 30;
  const polygon = simplify(points, tolerance, true);
  console.log(Object.keys(polyk));
  // removeCollinearPoints
  const clockwise = 
  Vertices.clockwiseSort(polygon)
    // .filter((el, i, arr) => {
    //   if (!arr[i - 1] || !arr[i + 1]) {
    //     return true
    //   }
    //   return !(getDistance(el, arr[i + 1]) < 5 || getDistance(el, arr[i - 1]) < 5)
    // })
    .map(el => {
      return {
        x: el.x += offsetX,
        y: el.y += offsetY,
      }
    })

  return clockwise;
}