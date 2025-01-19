import ExpoModulesCore
import SSZipArchive


enum ModuleError: Error {
    case ERROR
    case SOURCE
    case DESTINATION
    case PASSWORD
}

extension ModuleError: LocalizedError {
    public var errorDescription: String? {
        switch self {
            case .ERROR:
                return NSLocalizedString("An error occurred", comment: "")
            case .SOURCE:
                return NSLocalizedString("An error occurred", comment: "")
            case .DESTINATION:
                return NSLocalizedString("An error occurred", comment: "")
            case .PASSWORD:
                return NSLocalizedString("An archive has been encrypted", comment: "")
        }
    }
}

func getDirPath(
    _ dirPath: String
) -> String? {
    guard let url = NSURL(fileURLWithPath: dirPath).appendingPathComponent(UUID().uuidString, isDirectory: true) else {
        return nil
    }

    do {
        try FileManager.default.createDirectory(at: url, withIntermediateDirectories: true, attributes: nil)
        return url.path
    } catch {
        return nil
    }
}

func getFilePath(
    _ dirPath: String,
    _ ext: String
) -> String? {
    guard let url = NSURL(fileURLWithPath: dirPath).appendingPathComponent(UUID().uuidString + ext) else {
        return nil
    }
    
    return url.path
}

func encode(
  _ str: String
) -> String? {
    return str.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
}

func uncompress(
    _ zipPath: String
) throws -> String {
    guard let srcPath = encode(zipPath) else {
        throw ModuleError.SOURCE
    }

    guard let dstPath = getDirPath(NSTemporaryDirectory()) else {
        throw ModuleError.DESTINATION
    }

    if SSZipArchive.isFilePasswordProtected(atPath: srcPath) {
        throw ModuleError.PASSWORD
    }
          
    var error: NSError?
    let success: Bool = SSZipArchive.unzipFile(
        atPath: srcPath,
        toDestination: dstPath,
        preserveAttributes: true,
        overwrite: true,
        password: nil,
        error: &error,
        delegate: nil
    )

    if let error = error {
        throw error
    }

    if !success {
        throw ModuleError.ERROR
    }

    return dstPath
}

func compress(
    _ dirPath: String
) throws -> String {
    guard let srcPath = encode(dirPath) else {
        throw ModuleError.SOURCE
    }
    
    guard let dstPath = getFilePath(NSTemporaryDirectory(), ".zip") else {
        throw ModuleError.DESTINATION
    }
    
    SSZipArchive.createZipFile(atPath: dstPath, withContentsOfDirectory: srcPath, keepParentDirectory: false)

    return dstPath
}

public class ExpoZipZipModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoZipZip')` in JavaScript.
    Name("ExpoZipZip")

    Function("compress") { (sourcePath: String) throws -> String in
      return try compress(sourcePath)
    }

    Function("uncompress") { (sourcePath: String) throws -> String in
      return try uncompress(sourcePath)
    }
  }
}
