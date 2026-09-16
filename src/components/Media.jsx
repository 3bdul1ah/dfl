function assetUrl(asset) {
  return `${import.meta.env.BASE_URL}${asset.url}`;
}

export function ImageAsset({ asset, ...props }) {
  return <img src={assetUrl(asset)} alt={asset.alt} {...props} />;
}

export function VideoAsset({ asset }) {
  return (
    <video controls preload="metadata">
      {asset.types.map((type) => (
        <source key={type} src={assetUrl(asset)} type={type} />
      ))}
    </video>
  );
}
