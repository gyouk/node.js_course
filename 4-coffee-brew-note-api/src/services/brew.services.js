/**
 * BrewService class for managing coffee brews.
 * @module BrewService
 * @file BrewService
 */
export class BrewService{
    constructor() {

    this.brews = [];
    this.lastId = 0;
    }

    findAll({ method, ratingMin }) {
        let result = [...this.brews];
        if (method) result = result.filter(b => b.method === method);
        if (ratingMin) result = result.filter(b => (b.rating ?? 0) >= Number(ratingMin));
        return result;
    }

    findById(id) {
        const numId = Number(id);
        return this.brews.find(b => b.id === numId);
    }

    create(data) {
        const id = ++this.lastId;
        const brew = { ...data, id, brewedAt: data.brewedAt || new Date().toISOString() };
        this.brews.push(brew);
        return brew;
    }

    update(id, data) {
        const numId = Number(id);
        const idx = this.brews.findIndex(b => b.id === numId);
        if (idx === -1) return null;
        const updated = { ...this.brews[idx], ...data,id :numId };
        this.brews[idx] = updated;
        return updated;
    }

    delete(id) {
        const numId = Number(id);
        const idx = this.brews.findIndex(b => b.id === numId);
        if (idx === -1) return false;
        this.brews.splice(idx, 1);
        return true;
    }
}

