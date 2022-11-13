module.exports = async function (context, req) {
    context.log(req.body);

    if (req.body) {
        newEntry = req.body;
        context.bindings.newEntry = newEntry;
        context.res = {
            body: newEntry,
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