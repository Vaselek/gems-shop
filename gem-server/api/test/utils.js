import categoryFactory from "./factories/category";
import gemFactory from "./factories/gem";
import gemCategoryFactory from "./factories/gemCategory";
import metalFactory from "./factories/metal";
import gemMetalFactory from "./factories/gemMetal";
import stoneFactory from "./factories/stone";
import gemStoneFactory from "./factories/gemStone";
import coatingFactory from "./factories/coating";
import gemCoatingFactory from "./factories/gemCoating";

export async function createGemWithAssociatedModels() {
  const gemData = {};

  gemData.category = await categoryFactory();

  gemData.gem = await gemFactory({categoryIds: [gemData.category.id]});
  await gemCategoryFactory({categoryId: [gemData.category.id], gemId: gemData.gem.id});

  gemData.metal =  await metalFactory();
  await gemMetalFactory({metalId: [gemData.metal.id], gemId: gemData.gem.id});

  gemData.stone = await stoneFactory();
  await gemStoneFactory({stoneId: [gemData.stone.id], gemId: gemData.gem.id});

  gemData.coating = await coatingFactory();
  await gemCoatingFactory({coatingId: [gemData.coating.id], gemId: gemData.gem.id});

  return gemData;
}