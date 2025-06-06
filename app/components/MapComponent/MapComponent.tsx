import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { useRef, useCallback } from 'react';
import { isAuthenticated } from '~/stores/auth';

const placemarks = [
  [55.751574, 37.573856],
  [52.751574, 38.573856],
];

const MapComponent = () => {
  const mapRef = useRef<any>(null);

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Рассчитываем границы на основе массива placemarks
    const bounds = placemarks.reduce(
      (acc, coords) => {
        acc[0][0] = Math.min(acc[0][0], coords[0]);
        acc[0][1] = Math.min(acc[0][1], coords[1]);
        acc[1][0] = Math.max(acc[1][0], coords[0]);
        acc[1][1] = Math.max(acc[1][1], coords[1]);
        return acc;
      },
      [
        [Infinity, Infinity],
        [-Infinity, -Infinity],
      ],
    );

    // Устанавливаем границы карты
    map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 40 });
  }, []);

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY }}>
      <Map
        defaultState={{
          center: placemarks[0],
          zoom: 5,
        }}
        width='100%'
        height='400px'
        instanceRef={mapRef}
        onLoad={handleMapLoad}
      >
        {/* {isAuthenticated ? (
                    placemarks.map((coords, idx) => (
                        <Placemark key={idx} geometry={coords} />
                    ))
                ) : (
                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                        Пожалуйста, войдите, чтобы увидеть метки.
                    </div>
                )} */}
        {isAuthenticated() && (
          <Clusterer options={{ preset: 'islands#invertedVioletClusterIcons' }}>
            {placemarks.map((coords, idx) => (
              <Placemark key={idx} geometry={coords} />
            ))}
          </Clusterer>
        )}
      </Map>
    </YMaps>
  );
};

export default MapComponent;
