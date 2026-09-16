export function assetUrl(asset) {
  return `${import.meta.env.BASE_URL}${asset.url}`;
}
export function ImageAsset({ asset, alt, loading = "lazy", ...props }) {
  if (!asset?.url) return null;
  return (
    <img
      src={assetUrl(asset)}
      alt={alt ?? asset.alt ?? ""}
      width={asset.width}
      height={asset.height}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
export function VideoAsset({ asset, label }) {
  if (!asset?.url) return null;
  return (
    <video
      controls
      preload="metadata"
      aria-label={label}
      style={{ aspectRatio: asset.aspectRatio }}
      poster={asset.poster ? assetUrl(asset.poster) : undefined}
    >
      {asset.types.map((type) => (
        <source key={type} src={assetUrl(asset)} type={type} />
      ))}
    </video>
  );
}
