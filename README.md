<h2>구글 맵 공식 문서 라이브러리로 구글 맵 구현 react typescript</h2>

```
npm install @googlemaps/js-api-loader
```

## 히스토리

### 구글맵 클릭 시 구글맵 정보 좌표말고는 못가져오는건가
```
const markerPositions = [
  { lat: 37.5366059, lng: 126.9771397, title: '전쟁기념관' },
  { lat: 37.571094, lng: 126.991214, title: 'CGV 피카디리1958' },
  { lat: 37.5435494, lng: 127.0189517, title: '옥수현대아파트' }
];
```

### 일단은 Polyline까지 적용

### new google 은 에러나서 꼼수
```
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

 const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 15,
        });

```
