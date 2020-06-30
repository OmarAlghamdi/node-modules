const os = require('os');

// object is used later to map os.type to a meaningful name
const OS_TYPES = {
    'Linux': 'Linux',
    'Darwin': 'MacOS',
    'Windows_NT': 'Windows'
}


/**
    Desc: gets system information
    Params: n/a
    Returns: <Object>
        arch:       <String> Computer Architecure
        numCPU:     <Number> Number of CPU corse (Threads counted)
        freeMem:    <Number> Free Memory
        totalMem:   <Number> Total Memory
        OS:         <String> Operating Systme name
        OSVersion:  <String> Operating System version
        hostname:   <String> Hostname
        net:        <Object> Network Interface Card (NIC) details
*/
const getSysInfo = () => {
    return {
        arch: os.arch(),
        numCPU: os.cpus().length,
        freeMem: formatMem(os.freemem()),
        totalMem: formatMem(os.totalmem()),
        OS: OS_TYPES[os.type()],
        OSVersion: os.release(),
        hostname: os.hostname(),
        net: getNetInfo()
    }
    
}

/**
    Desc: foramts the free/total memory to GB/MB instead of bytes
    Params: <Number> memory size in bytes
    Returns: <String> size of memory
*/
const formatMem = (mem) => {
    const MB = 1048576;
    mem /= MB;
    if (mem >= 1024) {
        mem /= 1024;
        return `${mem.toFixed(2)} GB`;
    }
    return `${mem.toFixed(2)} MB`;
}

/**
    Desc: gets network interface card details
    Params: n/a
    Returns: <Object>
        mac:    <String> NIC's MAC Address
        cidr4:  <String> NIC's IPv4 Address in CIDR notation (including network mask)
        cidr6:  <String> NIC's IPv6 Address in CIDR notation (including network mask)
*/
const getNetInfo = () => {
    let eth ;
    const net = os.networkInterfaces();
    // selects an Ethernet interface
    Object.keys(net).forEach( (key) => {
        if (key.toLowerCase().includes('eth')) 
            eth = net[key];
    })

    let cidr_4, cidr_6;
    // gets IPv4 & IPv6 addresses
    if (eth[0].family === 'IPv4'){
        cidr_4 = eth[0].cidr;
        cidr_6 = eth[1].cidr;
    } else {
        cidr_4 = eth[1].cidr;
        cidr_6 = eth[0].cidr;
    }

    return {
        mac: eth[0].mac,
        cidr4: cidr_4,
        cidr6: cidr_6
    }
    
}

const sys = getSysInfo();

// formating system info.
const info = `Node is running on ${sys.OS} version ${sys.OSVersion} on ${sys.arch} architecture.
The system has ${sys.numCPU} CPUs with ${sys.freeMem} free memory out of ${sys.totalMem}.
Hostname: ${sys.hostname}, IPv4: ${sys.net.cidr4}, IPv6: ${sys.net.cidr6} & MAC Address: ${sys.net.mac}`;

console.log(info);