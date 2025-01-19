package expo.modules.zipzip

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

import net.lingala.zip4j.ZipFile
import net.lingala.zip4j.model.ZipParameters
import java.io.File
import java.util.UUID
import kotlin.io.path.createTempDirectory
import kotlin.io.path.createTempFile

fun compress(dirPath: String): String {
  val dstFile = createTempFile(prefix = UUID.randomUUID().toString(), suffix = ".zip")
  val dstPath = dstFile.toAbsolutePath().toString()
  val zipFile = ZipFile(dstPath)
  val zipParameters = ZipParameters()
  zipParameters.setReadHiddenFiles(true)
  zipParameters.setReadHiddenFolders(true)
  zipParameters.setIncludeRootFolder(false)
  zipFile.addFolder(File(dirPath), zipParameters)
  return dstPath
}

fun uncompress(zipPath: String): String {
  val zipFile = ZipFile(zipPath)

  if (zipFile.isEncrypted()) {
    throw Exception("An archive has been encrypted")
  }

  val dstDir = createTempDirectory()
  val dstPath = dstDir.toAbsolutePath().toString()

  zipFile.extractAll(dstPath)

  return dstPath
}

class ExpoZipZipModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoZipZip')` in JavaScript.
    Name("ExpoZipZip")

    Function("compress") { sourcePath: String ->
      return@Function compress(sourcePath)
    }

    Function("uncompress") { sourcePath: String ->
      return@Function uncompress(sourcePath)
    }
  }
}
