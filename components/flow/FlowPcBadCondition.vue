<template>
  <div :class="$style.flowContainer">
    <h3 :class="$style.sectionTitle">
      <i18n path="{tiredness} や {dyspnea} がある。" tag="p"
        >//
        <template v-slot:tiredness>
          <strong>
            {{ $t('強いだるさ(倦怠感)') }}
          </strong>
        </template>
        <template v-slot:dyspnea>
          <strong>
            {{ $t('息苦しさ(呼吸困難)') }}
          </strong>
        </template>
      </i18n>
    </h3>
    <h3 :class="$style.sectionTitle">
      <i18n path="{tiredness}" tag="p"
        >//
        <template v-slot:tiredness>
          <strong>
            {{ $t('すぐに！') }}
          </strong>
        </template>
      </i18n>
    </h3>
  </div>
</template>

<style module lang="scss">
.flowContainer {
  @include card-container();

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  height: 100%;
  color: $gray-2;
}

.sectionTitle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;

  strong {
    margin: 0 0.2em;
    font-size: 28px;
    font-weight: bold;
  }
}

.actionContainer {
  display: flex;
  justify-content: space-between;
}

.actions {
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0 !important; // FIXME: for ul element
}

.actionsList {
  list-style-type: none;
  text-align: start;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &Icon {
    min-width: 30px;
    min-height: 30px;
    display: block;
    margin-right: 10px;
  }
}

.icon {
  margin-right: 10px;
}

.nextAction {
  width: 49%;
  padding: 1rem;
  border: $green-1 1.5px solid;
  border-radius: 4px;
  text-align: center;

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
  }

  strong {
    font-size: 1.5rem;
  }
}
</style>
