import axios from "axios"
import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import * as MediaLibrary from "expo-media-library"

import { UPLOAD_URL_QUERY } from '../graphql/queries'

type UploadFileType = {
  upload: (file: File) => Promise<void>,
  fileUrl?: string,
  filename?: string,
  uploading: boolean,
  error: object | null,
  isUploaded: boolean,
  percentUploaded: number,
  errorMessage?: string
}

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

  const getHeaders = () => {
    return {
      "x-amz-acl": 'public-read'
    }
  }

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

  const upload = async (file: File) => {
    if (!file) return
    console.log('got the file')

    try {
      const { data: { uploadUrl: { signedUrl, filename } } } = await client.query({
        query: UPLOAD_URL_QUERY,
        variables: {
          input: {
            name: file.name,
          }
        },
        fetchPolicy: 'network-only'
      })

      console.log(signedUrl)
      setFilename(filename)

      const options = {
        headers: {
          "Content-Type": file.type,
          'X-Requested-With': 'XMLHttpRequest',
          ...getHeaders()
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          setPercentUploaded(percentCompleted)
        }
      }

      try {
        setIsValid(true)
        await axios.put(signedUrl, file, options)
      } catch (error) {
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