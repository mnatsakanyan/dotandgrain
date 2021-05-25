<script>
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector("form.cart").onsubmit = function (e) {
            e.preventDefault();
            let formElement = e.target;
            let formString = new URLSearchParams(new FormData(formElement)).toString();

            let getQueryParameters = function (str) {
                let dirtyObj = (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) {
                    return n = n.split("="), this[n[0]] = n[1], this
                }.bind({}))[0];
                delete dirtyObj[""];
                let result = {};
                for (let [key, value] of Object.entries(dirtyObj)) {
                    result[decodeURIComponent(key)] = decodeURIComponent(value);
                }

                if (Object.keys(result).length === 0 && result.constructor === Object) {
                    result = {};
                }
                return result;
            };
            let objData = getQueryParameters(formString);
            if (objData.quantity === undefined) {
                objData.quantity = 0;
            }

            let hasQueryString = e.target.action.indexOf('?') > -1;

            let a = document.createElement("a");
            let link = e.target.action + (hasQueryString ? '&' : '?') + "personalize=true" + "&quantity=" + objData.quantity + "&variant=" + objData.variation_id;

            delete objData.quantity;
            delete objData.variation_id;
            delete objData['add-to-cart'];

            let formQueryData = Object.entries(objData).reduce((acc, cur) => {
                return acc + "&" + cur[0] + "=" + cur[1]
            }, "");
            a.href = link + formQueryData;
            a.click();
        };
    });
</script>
