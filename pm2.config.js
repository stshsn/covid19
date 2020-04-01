module.exports = {
    apps : [
        {
            name: "covid19",
            script: "yarn start",
            cwd : '/root/website/covid19'
        },
        {
            name: "covid19_dev",
            script: "yarn dev:server",
            cwd : '/root/website/covid19_dev'
        }
    ]
}