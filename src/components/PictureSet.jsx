


const ImageHeader = ({ webp, avif, jpg, className, alt }) => {

    return (
        <>
            <picture>
                <source
                    srcset={webp}
                />
                <source
                    srcset={avif}
                />
                <img src={jpg} alt={alt} />
            </picture>
        </>
    )
}

export default ImageHeader;