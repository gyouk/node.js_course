/**
 * BrewController
 */
export class BrewController {
    constructor({ brewService }) {
        this.brewService = brewService;
    }

    getAll = (req, res) => {
        const { method, ratingMin } = req.query;
        const brews = this.brewService.findAll({ method, ratingMin });
        res.json(brews);
    };

    getById = (req, res) => {
        const brew = this.brewService.findById(req.params.id);
        if (!brew) return res.status(404).json({ error: "Brew not found" });
        res.json(brew);
    };

    create = (req, res) => {
        const brew = this.brewService.create(req.body);
        res.status(201).json(brew);
    };

    update = (req, res) => {
        const updated = this.brewService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: "Brew not found" });
        res.json(updated);
    };

    delete = (req, res) => {
        const ok = this.brewService.delete(req.params.id);
        if (!ok) return res.status(404).json({ error: "Brew not found" });
        res.status(204).send();
    };
}

