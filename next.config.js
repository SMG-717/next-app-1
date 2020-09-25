module.exports = {
    async headers() {
        return [
            {
                source: "/",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value:
                            "default-src https:; report-uri /csp-violation-report-endpoint/",
                    },
                ],
            },
        ];
    }
};