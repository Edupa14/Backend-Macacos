
function Success(res, data = {}, status = 200) {
    res.status(status).json({ ok: true, data});
}

function Error(res, error = {}, status = 500) {
    res.status(status).json({ ok: false, error });
}

module.exports = {
    Success,
    Error
}