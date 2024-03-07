import packageJson from '../../package.json'

export const VersionManager = {
  onVersionUpdate: (callback: () => void) => {
    const storedVersion = VersionManager._getStoredVersion()
    const currentVersion = VersionManager.getCurrentVersion()
    if (storedVersion !== currentVersion) {
      callback()
      VersionManager._setStoredVersion(currentVersion)
    }
  },

  getCurrentVersion: () => {
    return packageJson.version ?? 'unknown'
  },

  _getStoredVersion: () => {
    return localStorage.getItem('appVersion')
  },

  _setStoredVersion: (version: string) => {
    localStorage.setItem('appVersion', version)
  },
}

export default VersionManager
