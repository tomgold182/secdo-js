module.exports = {
    artifactTypes: {
        hostName: 'hostname',
        MD5: 'md5hash',
        fileName: 'filename',
        complex: 'complex',
        fullPath: 'fullpath',
        destinationIP: 'dest_ip',
        mixed: 'mixed'
    },
    operations: {
        case:'CASE',
        iceBlock: 'ICEBLOCK',
        isolate: 'ISOLATE',
        blackList: 'BLACKLIST',
        syslog: 'SYSLOG',
        report: 'REPORT'
    },
    severity: {
        high: 'HIGH',
        medium: 'MEDIUM',
        informational: 'INFORMATIONAL',
        low: 'LOW'
    }
}
