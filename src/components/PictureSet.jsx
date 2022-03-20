const ImageHeader = ({webp, avif, jpg, alt}) => {

    return (
        <>
            <picture>
                <source
                    srcSet={webp} media={`(max-width: 64px)`}
                />
                <source
                    srcSet={avif} media={`(max-width: 64px)`}
                />
                <img src={jpg} alt={alt}
                     style={{width: '256px', height: '256px', paddingTop: '10px', margin: 'auto'}}/>
            </picture>
        </>
    )
}

export default ImageHeader;