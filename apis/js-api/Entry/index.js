module.exports = async function (context, req) {
    context.log(req.body);

    if (req.body) {
        newRow = {
            TextEntry: req.body.newEntry,
            DisableView: false
        };
        context.bindings.newEntry = newRow;
        context.res = {
            body: newRow,
            mimetype: "application/json",
            status: 201
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a valid entry in the request body"
        };
    }
}