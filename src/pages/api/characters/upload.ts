import formidable from 'formidable'
import { NextApiHandler, NextApiRequest } from 'next'
import path from 'path'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  }
}

const readFile = (req: NextApiRequest, saveLocally: boolean): Promise<{fields: formidable.Fields; files: formidable.Files}> => {
  const options: formidable.Options = {};
  if(saveLocally){
    options.uploadDir = path.join(process.cwd(), '/public/audio/characters')
    options.filename = (name, ext, path, form) => {
      return path.originalFilename || ''
    }
  }
  const form = formidable(options)

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({fields, files})
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  try{
    await fs.readdir(path.join(process.cwd() + '/public', '/audio/characters'))
  }
  catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/public', '/audio/characters'))
  }

  const { files } = await readFile(req, true);
  const firstFile = Object.values(files)[0] as formidable.File;
  const filePath = firstFile ? `/audio/characters/${firstFile.newFilename}` : '';

  res.status(200).json({ success: true, path: filePath });

}


export default handler;