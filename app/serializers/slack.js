import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizePayload(payload) {
    this._super.apply(this, arguments);

    delete payload.ok;

    return payload;
  },

  modelNameFromPayloadKey(key) {
    if (key === 'members') {
      return 'user';
    }

    return this._super.apply(this, arguments);
  },

  keyForAttribute(attr, method) {
    return Ember.String.underscore(attr);
  },

  _normalizeUserProfile(hash) {
    if (typeof hash.profile !== 'object') {
      return;
    }

    // Merge profile into attribute hash
    for (var key in hash.profile) {
      hash[key] = hash.profile[key];
    }

    delete hash.profile;
  },

  normalize(typeClass, hash, prop) {
    if (typeClass.modelName === 'user') {
      this._normalizeUserProfile(hash);
    }

    return this._super.apply(this, arguments);
  }
});
