const ride = require("../model/ride");

module.exports.searchRides = async (req, res) => {
  let { from, to } = req.query;
  let currTime = new Date();
  from = from?.trim();
  to = to?.trim();

  try {
    let exactMatch = [];
    let suggestions = [];

    if (from && to) {
      exactMatch = await ride
        .find({
          pickup_location: { $regex: from, $options: "i" },
          destination: { $regex: to, $options: "i" },
        })
        .populate("driver");
    }

    if (from || to) {
      suggestions = await ride
        .find({
          $or: [
            ...(from
              ? [{ pickup_location: { $regex: from, $options: "i" } }]
              : []),
            ...(to ? [{ destination: { $regex: to, $options: "i" } }] : []),
          ],
        })
        .populate("driver");
    }

    // Filter both arrays for future rides with available seats
    const isValid = (r) =>
      new Date(r.departure_date_time).getTime() > Date.now() &&
      Number(r.seat) > 0;

    exactMatch = exactMatch.filter(isValid);
    suggestions = suggestions.filter(isValid);

    console.log("exactMatch count:", exactMatch.length); // ✅ Fixed log

    res.render("user/search_result", {
      exactMatch,
      suggestions,
      currTime,
      from,
      to,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in search");
  }
};
