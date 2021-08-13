import axios from "axios"
import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import * as MediaLibrary from "expo-media-library"

import { UPLOAD_URL_QUERY } from '../graphql/queries'

type UploadFileType = {
  upload: (asset: MediaLibrary.Asset) => Promise<void>,
  fileUrl?: string,
  filename?: string,
  uploading: boolean,
  error: object | null,
  isUploaded: boolean,
  percentUploaded: number,
  errorMessage?: string
}

const getFileType = (mediaType: string) => mediaType === 'photo' ? 'image/jpeg' : 'video/mp4'

type Params = {
  message?: string,
}

export default function useFileUpload({ message }: Params): UploadFileType {
  const client = useApolloClient()

  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [fileUrl, setFileUrl] = useState(undefined)
  const [filename, setFilename] = useState(undefined)
  const [isUploaded, setIsUploaded] = useState(false)
  const [percentUploaded, setPercentUploaded] = useState(0)

  useEffect(() => {
    if (isValid) {
      setErrorMessage(undefined)
    } else {
      setErrorMessage(message || "Please choose a file.")
    }
  }, [isValid])

  useEffect(() => {
    if (percentUploaded === 100) {
      setIsUploaded(true)
    }
    setUploading(percentUploaded > 0 && percentUploaded < 100)
  }, [percentUploaded])

  const upload = async (asset: MediaLibrary.Asset) => {
    if (!asset) return

    setIsUploaded(false)

    try {
      const { data: { uploadUrl: { signedUrl, filename } } } = await client.query({
        query: UPLOAD_URL_QUERY,
        variables: {
          input: {
            name: asset.filename.toLowerCase(),
          }
        },
        fetchPolicy: 'network-only'
      })

      setFilename(filename)

      const options = {
        headers: {
          "Content-Type": getFileType(asset.mediaType),
          "Content-Disposition": "inline",
          'X-Requested-With': 'XMLHttpRequest',
          "x-amz-acl": 'public-read'
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          setPercentUploaded(percentCompleted)
        }
      }

      const media = new FormData()

      // const assetblob = await (await fetch(asset.uri)).blob()
      media.append("media", {
        uri: asset.uri,
        name: asset.filename.toLowerCase(),
        type: getFileType(asset.mediaType)
      })


      try {
        setIsValid(true)
        await axios.put(signedUrl, media, options)
      } catch (error) {
        console.error(error)
        setError(error)
        setIsValid(false)
      }
    } catch (error) {
      setError(error)
      console.error(error)
    }
  }

  return {
    upload,
    fileUrl,
    uploading,
    error,
    isUploaded,
    percentUploaded,
    errorMessage,
    filename
  }
}