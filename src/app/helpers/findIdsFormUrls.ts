export const findIdsFormUrls = (urls: string[]) => {
    return urls.map(url => {
        const urlAsArray = url.split('/')

        return +urlAsArray[urlAsArray.length - 1];
    })
}
